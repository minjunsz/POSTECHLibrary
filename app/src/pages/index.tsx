import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => <div>hello world</div>

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)