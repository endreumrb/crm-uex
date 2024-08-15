import '@/styles/globals.css';
import 'devextreme/dist/css/dx.light.css';
import Layout from '@/components/Layout';

/**
 * Main App component for the CRM Kanban application.
 * This component wraps all pages with a common layout and applies global styles.
 *
 * @param {Object} props - The component props
 * @param {React.ComponentType} props.Component - The page component to be rendered
 * @param {Object} props.pageProps - The props to be passed to the page component
 * @returns {React.ReactElement} The rendered application
 */
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}