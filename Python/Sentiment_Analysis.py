import re 
import tweepy 
from tweepy import OAuthHandler 
from textblob import TextBlob 
import pymongo
  
class TwitterClient(object): 
    def __init__(self): 
        consumer_key = ''
        consumer_secret = ''
        access_token = ''
        access_token_secret = ''
        try: 
            self.auth = OAuthHandler(consumer_key, consumer_secret) 
            self.auth.set_access_token(access_token, access_token_secret) 
            self.api = tweepy.API(self.auth) 
        except: 
            print("Error: Authentication Failed") 
  
    def clean_tweet(self, tweet): 
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split()) 
  
    def get_tweet_sentiment(self, tweet): 
        analysis = TextBlob(self.clean_tweet(tweet)) 
        if analysis.sentiment.polarity > 0: 
            return 'positive'
        elif analysis.sentiment.polarity == 0: 
            return 'neutral'
        else: 
            return 'negative'
  
    def get_tweets(self, query, count = 10): 
        tweets = [] 
  
        try: 
            fetched_tweets = self.api.search(q = query, count = count) 
            # myclient = pymongo.MongoClient("mongodb://localhost:27017/")
            # mydb = myclient["twitter_sentiment"]
            # mycol = mydb["tweets"]
            for tweet in fetched_tweets: 
                parsed_tweet = {} 
                parsed_tweet['text'] = tweet.text 
                parsed_tweet['candidate'] = query
                parsed_tweet['user_name'] = tweet.user.name
                parsed_tweet['location'] = tweet.user.location
                parsed_tweet['created'] = tweet.created_at.strftime("%d/%m/%Y")
                parsed_tweet['followers'] = tweet.user.followers_count
                parsed_tweet['avatar'] = tweet.user.profile_image_url
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text) 
  
                if tweet.retweet_count > 0: 
                    if parsed_tweet not in tweets: 
                        tweets.append(parsed_tweet) 
                        # mycol.insert_one(parsed_tweet)
                else: 
                    tweets.append(parsed_tweet) 
                    # mycol.insert_one(parsed_tweet)
  
            return tweets 
  
        except tweepy.TweepError as e: 
            print("Error : " + str(e)) 
  
def main(): 
    api = TwitterClient() 
    candidateName = "Raj Thackeray"
    tweets = api.get_tweets(query = candidateName, count = 100) 

    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive'] 
    positive_tweets = (100*len(ptweets)/len(tweets));    
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative'] 
    negative_tweets = (100*len(ntweets)/len(tweets));
    netweets = [tweet for tweet in tweets if tweet['sentiment'] == 'neutral'] 
    neutral_tweets = (100*len(netweets)/len(tweets));

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["twitter_sentiment"]
    mycol = mydb["candidates"]

    candidate = {}
    candidate['name'] = candidateName
    candidate['avatar'] = "https://static-news.moneycontrol.com/static-mcnews/2019/04/Raj-Thackeray-1-770x433.jpg"
    candidate['positive_tweets'] = positive_tweets
    candidate['negative_tweets'] = negative_tweets
    candidate['neutral_tweets'] = neutral_tweets

    #mycol.insert_one(candidate)


    print("Positive tweets percentage: "+str(positive_tweets)) 
    print("Negative tweets percentage: "+str(negative_tweets)) 
    print("Neutral tweets percentage: "+str(neutral_tweets)) 

  
if __name__ == "__main__": 
    main() 
