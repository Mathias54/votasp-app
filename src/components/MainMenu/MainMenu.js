import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import firebase from 'firebase/app';
import classnames from 'classnames';

import { VOTER, CANDIDATE } from '../../constants/userRoles';
import { getCurrentUser } from '../../Questionario/QuestionarioService';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import './MainMenu.css';

class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isCandidate: false
    };

    this.toggleMainMenu = this.toggleMainMenu.bind(this);
  }

  componentDidMount = () => {
    getCurrentUser()
      .then(doc => {
        const user = doc.data();
        this.setState({
          isCandidate: user.role === CANDIDATE
        });
      })
      .catch(() => {
        this.setState({
          isCandidate: false
        });
      });
  };

  toggleMainMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleLogout = () => {
    this.props.history.push('/app');
    firebase.auth().signOut();
  };

  render() {
    const { isCandidate } = this.state;

    return (
      <nav className={classnames('navigation-menu', { opened: this.state.isOpen })}>
        <HamburgerMenu onClick={this.toggleMainMenu} />
        <ul className="navigation-menu">
          {!firebase.auth().currentUser && (
            <li className="navigation-menu__list">
              <NavLink to="/app" className="navigation-menu__link">
                Quero participar!
              </NavLink>
            </li>
          )}

          {firebase.auth().currentUser && (
            <React.Fragment>
              <li className="navigation-menu__list">
                <NavLink
                  to="/app/questionario/1"
                  activeClassName="active"
                  className="navigation-menu__link"
                >
                  Questões
                </NavLink>
              </li>
              <li className="navigation-menu__list">
                <NavLink
                  to="/como-funciona"
                  activeClassName="active"
                  className="navigation-menu__link"
                >
                  Como funciona
                </NavLink>
              </li>
              <li className="navigation-menu__list">
                <NavLink
                  to="/app/calculando-ranking"
                  activeClassName="active"
                  className="navigation-menu__link"
                >
                  Ver meu ranking
                </NavLink>
              </li>
              {isCandidate && (
                <li className="navigation-menu__list">
                  <NavLink
                    to="/app/atualizar-informacoes"
                    activeClassName="active"
                    className="navigation-menu__link"
                  >
                    Atualizar informações
                  </NavLink>
                </li>
              )}
              <li className="navigation-menu__list">
                <button className="navigation-menu__link" onClick={this.handleLogout}>
                  Sair
                </button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

export default withRouter(MainMenu);
