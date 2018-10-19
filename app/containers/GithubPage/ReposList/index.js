import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'antds/Row';
import Col from 'antds/Col';


class ReposList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillReceiveProps(nextProps) {
    const self = this;
    const nvs = self.props.repos.map((d) => d.name).join('|');
    const ovs = nextProps.repos.map((d) => d.name).join('|');
    if (nvs !== ovs ||
      self.props.apiError !== nextProps.apiError ||
      self.props.apiLoading !== nextProps.apiLoading) {
      self.setState({});
    }
  }

  renderList({ apiLoading, apiError, repos }) {
    if (apiLoading) {
      return '搜索中...';
    }
    if (apiError) {
      return '请求出错！';
    }
    return (
      <ul>
        {repos.map((d) => <li key={d.id}>{d.name}</li>)}
      </ul>
    );
  }

  render() {
    const self = this;

    return (
      <Row gutter={24}>
        <Col offset={3} span={18}>{self.renderList(self.props)}</Col>
      </Row>
    );
  }
}

ReposList.propTypes = {
  repos: PropTypes.array.isRequired,
  apiError: PropTypes.bool.isRequired,
  apiLoading: PropTypes.bool.isRequired,
};

export default connect((state) => {
  const github = state.github;
  return {
    repos: github.repos,
    apiError: github.apiError,
    apiLoading: github.apiLoading,
  };
})(ReposList);
