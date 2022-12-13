/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */
import React from 'react';
// Components
import PageWrapper from './src/components/PageWrapper';

/*************************************************
 Wraps all pages of our app in our custom PageWrapper component.
 https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement
**************************************************/
export const wrapPageElement = ({element, props}) => (
  <PageWrapper {...props}>{element}</PageWrapper>
);
