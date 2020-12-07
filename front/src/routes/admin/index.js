import React, {lazy, Suspense} from 'react';
import {Spin} from 'antd';
import {useSelector} from 'react-redux';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Dashboard from './dashboard';
import Pages from './pages';
import Ecommerce from './ecommerce';
import withAdminLayout from '../../layout/withAdminLayout';
import {Redirect} from 'react-router-dom/cjs/react-router-dom.min';

const Charts = lazy(() => import('./charts'));
const Components = lazy(() => import('./components'));
const Maps = lazy(() => import('./maps'));
const Icons = lazy(() => import('./icons'));
const Projects = lazy(() => import('./projects'));
const Calendars = lazy(() => import('../../container/Calendar'));
const Tables = lazy(() => import('../../container/table/Table'));
const Forms = lazy(() => import('../../container/forms/Forms'));
const Inbox = lazy(() => import('../../container/email/Email'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Settings = lazy(() => import('../../container/profile/settings/Settings'));
const Firebase = lazy(() => import('./firebase'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const ToDo = lazy(() => import('../../container/toDo/ToDo'));
const Note = lazy(() => import('../../container/note/Note'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const Product = lazy(() => import('../../container/ecommerce/product/Products'));

const Admin = () => {
  const { path } = useRouteMatch();

  const { user } = useSelector(state => {
    return {
      user: state.auth.user,
    };
  });

  if (user.role === 'admin') {
    return (
      <Switch>
        <Suspense
          fallback={
            <div className="spin">
              <Spin />
            </div>
          }
        >
          <Route path={path} component={Dashboard} />
          <Route path={`${path}/ecommerce`} component={Ecommerce} />
          <Route path={`${path}/charts`} component={Charts} />
          <Route path={`${path}/pages`} component={Pages} />
          <Route path={`${path}/components`} component={Components} />
          <Route path={`${path}/maps`} component={Maps} />
          <Route path={`${path}/icons`} component={Icons} />
          <Route path={`${path}/project`} component={Projects} />

          <Route path={`${path}/calendar`} component={Calendars} />
          <Route path={`${path}/tables`} component={Tables} />
          <Route path={`${path}/forms`} component={Forms} />

          <Route path={`${path}/email/:page`} component={Inbox} />
          <Route path={`${path}/firestore`} component={Firebase} />
          <Route path={`${path}/main/chat`} component={Chat} />
          <Route path={`${path}/profile/settings`} component={Settings} />
          <Route path={`${path}/profile/myProfile`} component={Myprofile} />
          <Route path={`${path}/app/to-do`} component={ToDo} />
          <Route path={`${path}/app/note`} component={Note} />
          <Route path={`${path}/app/contact`} component={Contact} />
        </Suspense>
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Suspense
          fallback={
            <div className="spin">
              <Spin />
            </div>
          }
        >
          <Route exact path={path}>
            <Redirect to={`${path}/ecommerce/products`} />{' '}
          </Route>
          <Route path={`${path}/ecommerce`} component={Ecommerce} />
          <Route path={`${path}/charts`} component={Charts} />
          <Route path={`${path}/pages`} component={Pages} />
          <Route path={`${path}/components`} component={Components} />
          <Route path={`${path}/maps`} component={Maps} />
          <Route path={`${path}/icons`} component={Icons} />
          <Route path={`${path}/project`} component={Projects} />

          <Route path={`${path}/calendar`} component={Calendars} />
          <Route path={`${path}/tables`} component={Tables} />
          <Route path={`${path}/forms`} component={Forms} />

          <Route path={`${path}/email/:page`} component={Inbox} />
          <Route path={`${path}/firestore`} component={Firebase} />
          <Route path={`${path}/main/chat`} component={Chat} />
          <Route path={`${path}/profile/settings`} component={Settings} />
          <Route path={`${path}/profile/myProfile`} component={Myprofile} />
          <Route path={`${path}/app/to-do`} component={ToDo} />
          <Route path={`${path}/app/note`} component={Note} />
          <Route path={`${path}/app/contact`} component={Contact} />
        </Suspense>
      </Switch>
    );
  }
};

export default withAdminLayout(Admin);
