import { MmWebPage } from './app.po';

describe('mm-web App', function() {
  let page: MmWebPage;

  beforeEach(() => {
    page = new MmWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
