import { AngstartPage } from './app.po';

describe('angstart App', function() {
  let page: AngstartPage;

  beforeEach(() => {
    page = new AngstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
