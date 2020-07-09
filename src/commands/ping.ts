import moment from 'moment';
import 'moment-precise-range-plugin';
export default () => moment().subtract(process.uptime(), 's').preciseDiff(moment());
