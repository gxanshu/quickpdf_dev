import { JSX } from 'solid-js/jsx-runtime';
import { Router, Route, Routes, hashIntegration } from '@solidjs/router';
import { lazy } from 'solid-js';
const Home = lazy(() => import('./Home'));
const NewCompany = lazy(() => import('./NewCompany'));
const NewDesign = lazy(() => import('./NewDesign'));
const NewPDF = lazy(() => import('./NewPDF'));
const EditPDF = lazy(() => import('./EditPDF'));
const Company = lazy(() => import('./Company'));
const AddUser = lazy(() => import('./AddUser'));
const EditUser = lazy(() => import('./EditUser'));
const EditLayout = lazy(() => import('./EditLayout'));

export default function Dashboard(): JSX.Element {
  return (
    <Router source={hashIntegration()}>
      <Routes>
        <Route path='/' component={Home} />
        <Route path='/company' component={NewCompany} />
        <Route path='/company/:companyName' component={Company} />
        <Route path='/new-design/:companyName' component={NewDesign} />
        <Route path='/new-pdf/:companyName' component={NewPDF} />
        <Route path='/edit-pdf/:companyName/:realDate' component={EditPDF} />
        <Route path='/user-add' component={AddUser} />
        <Route path='/user-edit' component={EditUser} />
        <Route path='/edit-layout/:companyName/:componentName' component={EditLayout} />
      </Routes>
    </Router>
  );
}
