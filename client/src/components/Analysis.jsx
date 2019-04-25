import React, { Component } from 'react';
import axios from 'axios';
import ENavbar from './Navbar';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  TabContent,
  TabPane,
  Container,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import bigChartData from 'variables/charts.jsx';

export default class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [
        {
          avatar:
            'https://yt3.ggpht.com/a-/AAuE7mC92X11eh-Tlf8RNkBKMkmEgr8_pAXDb951TA=s900-mo-c-c0xffffffff-rj-k-no',
          name: 'Narendra Modi',
          negative_tweets: 10.144927536231885,
          neutral_tweets: 71.01449275362319,
          positive_tweets: 18.840579710144926,
          _id: '5cbf1d2458eb35f8efbf9615'
        }
      ],
      showAnalysis: false,
      selectedCandidate: '',
      doughnutChartData: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
          {
            data: [10, 10, 10],
            backgroundColor: ['#008000', '#0000FF', '#FF0000'],
            hoverBackgroundColor: ['#006400', '#000080', '#8B0000']
          }
        ]
      },
      iconTabs: 1,
      positiveTweets: [
        {
          avatar:
            '"http://pbs.twimg.com/profile_images/997346755883819008/CV3b835r_normal.jpg"',
          created: '"23/04/2019"',
          followers: 503,
          location: 'Pachwas',
          text:
            "RT @svaradarajan: A great decision but remember this folks, the taxpayers of Gujarat must now  pay for Chowkidar Narendra Modi's splendid c…",
          user_name: 'Laboni Singh'
        }
      ],
      neutralTweets: [
        {
          avatar:
            '"http://pbs.twimg.com/profile_images/997346755883819008/CV3b835r_normal.jpg"',
          created: '"23/04/2019"',
          followers: 503,
          location: 'Pachwas',
          text:
            "RT @svaradarajan: A great decision but remember this folks, the taxpayers of Gujarat must now  pay for Chowkidar Narendra Modi's splendid c…",
          user_name: 'Laboni Singh'
        }
      ],
      negativeTweets: [
        {
          avatar:
            '"http://pbs.twimg.com/profile_images/997346755883819008/CV3b835r_normal.jpg"',
          created: '"23/04/2019"',
          followers: 503,
          location: 'Pachwas',
          text:
            "RT @svaradarajan: A great decision but remember this folks, the taxpayers of Gujarat must now  pay for Chowkidar Narendra Modi's splendid c…",
          user_name: 'Laboni Singh'
        }
      ]
    };

    console.log(this.props);
  }

  componentDidMount() {
    document.body.classList.toggle('landing-page');
    axios
      .get('/api/tweets/getCandidates')
      .then(res => {
        console.log('candidates: ', res.data.candidates);
        this.setState({ candidates: res.data.candidates });
      })
      .catch(err => console.log(err));
  }
  componentWillUnmount() {
    document.body.classList.toggle('landing-page');
  }

  onCandidateSelect = candidate_name => {
    console.log('selected candidate name: ', candidate_name);
    let positive_tweets, neutral_tweets, negative_tweets;
    const { candidates } = this.state;
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i].name === candidate_name) {
        positive_tweets = candidates[i].positive_tweets;
        neutral_tweets = candidates[i].neutral_tweets;
        negative_tweets = candidates[i].negative_tweets;
      }
    }
    const doughnutChartData = {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        {
          data: [positive_tweets, neutral_tweets, negative_tweets],
          backgroundColor: ['#008000', '#0000FF', '#FF0000'],
          hoverBackgroundColor: ['#006400', '#000080', '#8B0000']
        }
      ]
    };

    axios.get('/api/tweets/getPositiveTweets/' + candidate_name).then(res1 => {
      axios
        .get('/api/tweets/getNegativeTweets/' + candidate_name)
        .then(res2 => {
          axios
            .get('/api/tweets/getNeutralTweets/' + candidate_name)
            .then(res3 => {
              const positiveTweets = res1.data.tweets;
              const negativeTweets = res2.data.tweets;
              const neutralTweets = res3.data.tweets;

              console.log('positive tweets: ', positiveTweets);
              console.log('negative tweets: ', negativeTweets);
              console.log('neutral tweets: ', neutralTweets);

              this.setState({
                selectedCandidate: candidate_name,
                showAnalysis: true,
                doughnutChartData,
                positiveTweets,
                negativeTweets,
                neutralTweets
              });
            });
        });
    });
  };

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };

  render() {
    const {
      candidates,
      selectedCandidate,
      showAnalysis,
      doughnutChartData,
      positiveTweets,
      neutralTweets,
      negativeTweets
    } = this.state;

    let contentToShow;
    if (!showAnalysis) {
      contentToShow = (
        <Container>
          <Row className="mt-5">
            {candidates.map(candidate => {
              return (
                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <Link to="/analysis">
                    <img
                      alt="..."
                      className="img-fluid rounded-circle shadow-lg"
                      src={require('candidates/' + candidate.name + '.jpg')}
                      style={{ width: '100%' }}
                      onClick={() => this.onCandidateSelect(candidate.name)}
                    />
                  </Link>
                  <h5 className="d-block text-center mt-3 font-weight-bold mb-4">
                    {candidate.name}
                  </h5>
                </Col>
              );
            })}
          </Row>
        </Container>
      );
    } else {
      contentToShow = (
        <div>
          <Container>
            <Row>
              <Col md="2">
                <img
                  alt="..."
                  className="img-fluid mt-4 rounded-circle shadow-lg"
                  src={require('candidates/' + selectedCandidate + '.jpg')}
                  style={{ width: '100%' }}
                />
                <h4 className="text-center mt-4">{selectedCandidate}</h4>
              </Col>
              <Col md="10">
                <Card className="card-chart card-plain">
                  <CardBody>
                    <Doughnut data={doughnutChartData} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <Col md="12">
            <Card className="card-chart card-plain">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Tweets Graph</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={bigChartData.data}
                    options={bigChartData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Container>
            <div className="title">
              <h3 className="mb-3">Trending Tweets</h3>
            </div>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Nav className="nav-tabs-info" role="tablist" tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.iconTabs === 1
                          })}
                          onClick={e => this.toggleTabs(e, 'iconTabs', 1)}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-spaceship" />
                          Positive Tweets
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.iconTabs === 2
                          })}
                          onClick={e => this.toggleTabs(e, 'iconTabs', 2)}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-settings-gear-63" />
                          Neutral Tweets
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.iconTabs === 3
                          })}
                          onClick={e => this.toggleTabs(e, 'iconTabs', 3)}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-bag-16" />
                          Negative Tweets
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                  <CardBody>
                    <TabContent
                      className="tab-space"
                      activeTab={'link' + this.state.iconTabs}
                    >
                      <TabPane tabId="link1">
                        <Container>
                          {positiveTweets.map((tweet, index) => {
                            return (
                              <div key={index}>
                                <Row>
                                  <div className="panel panel-default">
                                    <div className="panel-body">
                                      <div className="media">
                                        <img
                                          className="media-object rounded-circle"
                                          src={tweet.avatar}
                                          alt="..."
                                        />
                                        <div className="media-body ml-2">
                                          <h4 className="media-heading">
                                            {tweet.user_name} <br />
                                            <small>
                                              <i className="glyphicon glyphicon-time" />
                                              &nbsp;{tweet.created}
                                            </small>
                                          </h4>
                                        </div>
                                      </div>
                                      <p>{tweet.text}</p>
                                    </div>
                                  </div>
                                </Row>
                                <Row>
                                  <hr className="line-primary" />
                                </Row>
                              </div>
                            );
                          })}
                        </Container>
                      </TabPane>
                      <TabPane tabId="link2">
                        <Container>
                          {neutralTweets.map((tweet, index) => {
                            return (
                              <div key={index}>
                                <Row>
                                  <div className="panel panel-default">
                                    <div className="panel-body">
                                      <div className="media">
                                        <img
                                          className="media-object rounded-circle"
                                          src={tweet.avatar}
                                          alt="..."
                                        />
                                        <div className="media-body ml-2">
                                          <h4 className="media-heading">
                                            {tweet.user_name} <br />
                                            <small>
                                              <i className="glyphicon glyphicon-time" />
                                              &nbsp;{tweet.created}
                                            </small>
                                          </h4>
                                        </div>
                                      </div>
                                      <p>{tweet.text}</p>
                                    </div>
                                  </div>
                                </Row>
                                <Row>
                                  <hr className="line-primary" />
                                </Row>
                              </div>
                            );
                          })}
                        </Container>
                      </TabPane>
                      <TabPane tabId="link3">
                        <Container>
                          {negativeTweets.map((tweet, index) => {
                            return (
                              <div key={index}>
                                <Row>
                                  <div className="panel panel-default">
                                    <div className="panel-body">
                                      <div className="media">
                                        <img
                                          className="media-object rounded-circle"
                                          src={tweet.avatar}
                                          alt="..."
                                        />
                                        <div className="media-body ml-2">
                                          <h4 className="media-heading">
                                            {tweet.user_name} <br />
                                            <small>
                                              <i className="glyphicon glyphicon-time" />
                                              &nbsp;{tweet.created}
                                            </small>
                                          </h4>
                                        </div>
                                      </div>
                                      <p>{tweet.text}</p>
                                    </div>
                                  </div>
                                </Row>
                                <Row>
                                  <hr className="line-primary" />
                                </Row>
                              </div>
                            );
                          })}
                        </Container>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return (
      <>
        <ENavbar />
        <div className="wrapper">
          <section className="section section-lg">{contentToShow}</section>
        </div>
      </>
    );
  }
}
