import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

let oldPathname = ''

history.listen((e) => {
  // console.log(oldPathname, e.pathname)
  if (oldPathname !== e.pathname && e.pathname.indexOf('stores/detail') === -1) {
    oldPathname = e.pathname
    window.scrollTo(0, 0)
  }
})

export default history;
