import getUrlParam from 'utils/getUrlParam';
import ContentfulPreview from 'constants/ContentfulPreview';

export default () => {
  return (
    getUrlParam(ContentfulPreview.PARAMETER) ===
    ContentfulPreview.EXPECTED_VALUE
  );
};
