import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';
import axios from 'axios';
class Candidates extends Component {
  constructor() {
    super();
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
      ]
    };
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
  render() {
    const { candidates } = this.state;
    return (
      <div>
        <Container>
          <Row className="mt-5">
            {candidates.map(candidate => {
              return (
                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <Link
                    to={{
                      pathname: '/analysis',
                      state: {
                        selectedCandidate: candidate.name,
                        positive_tweets: candidate.positive_tweets,
                        neutral_tweets: candidate.neutral_tweets,
                        negative_tweets: candidate.negative_tweets
                      }
                    }}
                  >
                    <img
                      alt="..."
                      className="img-fluid rounded-circle shadow-lg"
                      src={require('candidates/' + candidate.name + '.jpg')}
                      style={{ width: '100%' }}
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
      </div>
    );
  }
}

export default Candidates;
