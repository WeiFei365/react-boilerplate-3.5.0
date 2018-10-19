import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Row from 'antds/Row';
import Col from 'antds/Col';
import Input from 'antds/Input';
import Button from 'antds/Button';

import ReposList from './ReposList';
import { stateAny, fetchRepos } from './actions';
import reducer from './reducer';
import saga from './saga';
import css from './style.css';

class GithubPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: this.props.username,
  };

  onChange = (evt) => {
    this.setState({ username: evt.target.value });
  }

  onClick = () => {
    const {
      props: {
        dispatch,
      },
      state,
    } = this;

    dispatch(stateAny({ username: state.username }));
    dispatch(fetchRepos());
  }

  render() {
    const self = this;
    const { username } = self.state;

    return (
      <div className={css.github}>
        <Row gutter={24}>
          <Col offset={6} span={12}>
            <h1>查看 Github 中某用户的公开项目列表</h1>
            <h3>如果用户不存在会报错</h3>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col offset={6} span={6}><Input value={username} onChange={self.onChange} /></Col>
          <Col span={6}><Button type="primary" onClick={self.onClick}>看TA的项目</Button></Col>
        </Row>
        <ReposList />
      </div>
    );
  }
}

GithubPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

// route 组件，构建新的 reducer 到 redux
export default compose(
  injectReducer({ key: 'github', reducer }),
  injectSaga({ key: 'github', saga }),
  connect((state) => {
    const github = state.github;
    return {
      username: github.username || '',
    };
  }),
)(GithubPage);
