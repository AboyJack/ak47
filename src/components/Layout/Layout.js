import React,{ Component } from 'react';
import { getData } from './../../actions/Route';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Menu, Icon, List, Spin, Affix } from 'antd';
import ItemCard from './../ItemCard/ItemCard.js';
import ItemAvatar from './../ItemAvatar/ItemAvatar.js';
import 'antd/dist/antd.css';
import * as styles from './Layout.css';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const user = [
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas',
  }
]

const recommendedUsers = [
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas2',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas3',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas4',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas5',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas6',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas7',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas8',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas9',
  },
  {
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    name: 'Thomas10',
  }
]
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasMore: true,
      current: 'home',
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    getData(dispatch,10);
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };
  handleInfiniteOnLoad = (page) => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      const { dispatch } = this.props;
      const { count } = this.props.reducers.layout;
      getData(dispatch,count + 10);
    },500);
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    },700);
  };
  renderList(listData) {
    const listArray = listData.map((list,index) => {
      return (
        <ItemCard list={list} key={"card" + index} />
      );
    });
    return listArray;
  }
  render() {
    const { loading, data } = this.state;
    const { listData, count } = this.props.reducers.layout;
    return (
      <div className="body">
        <Affix>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="ant-layout-header"
          >
            <Menu.Item key="home">
              <Icon className="icon" type="home" />
            </Menu.Item>
            <Menu.Item key="about">
              <Icon className="icon" type="compass" />
            </Menu.Item>
            <Menu.Item key="user">
              <Icon className="icon" type="user" />
            </Menu.Item>
          </Menu>
        </Affix>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={true}
          threshold={10}
          className="infiniteScroll"
        >
          {this.renderList(listData)}
          {this.state.loading && <Spin className="loading" />}
          <div className="right">
            {
              user.map((list,index) => {
                return (
                  <ItemAvatar list={list} />
                );
              })
            }
            <div className="fastBeat">快拍</div>
            <div className="recommendedUsers">
              {
                recommendedUsers.map((list,index) => {
                  return (
                    <ItemAvatar list={list} />
                  );
                })
              }
            </div>
            <div className="copyRight">
              © 2018 ShareImage
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(App)