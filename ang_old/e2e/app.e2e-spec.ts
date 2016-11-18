import { AngOldPage } from './app.po';

describe('ang-old App', function() {
  let page: AngOldPage;

  beforeEach(() => {
    page = new AngOldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
