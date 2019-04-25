import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import ENavbar from './Navbar';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle
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
      }
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
    this.setState({
      selectedCandidate: candidate_name,
      showAnalysis: true,
      doughnutChartData
    });
  };

  render() {
    const {
      candidates,
      selectedCandidate,
      showAnalysis,
      doughnutChartData
    } = this.state;

    let contentToShow;
    if (!showAnalysis) {
      contentToShow = (
        <Container>
          <Row className="mt-5">
            {candidates.map(candidate => {
              return (
                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <img
                    alt="..."
                    className="img-fluid rounded-circle shadow-lg"
                    src={require('candidates/' + candidate.name + '.jpg')}
                    style={{ width: '100%' }}
                    onClick={() => this.onCandidateSelect(candidate.name)}
                  />
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
