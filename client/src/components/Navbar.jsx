import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { NavbarBrand, Navbar, Container } from 'reactstrap';

class ENavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: 'navbar-transparent'
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: 'bg-info'
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: 'navbar-transparent'
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: 'collapsing-out'
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ''
    });
  };
  render() {
    return (
      <Navbar
        className={'fixed-top ' + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              tag={Link}
            >
              <span>Twitter Sentiment Analysis</span>
            </NavbarBrand>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default ENavbar;
