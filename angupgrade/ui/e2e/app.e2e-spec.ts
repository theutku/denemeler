import { AngupgradePage } from './app.po';

describe('angupgrade App', function() {
  let page: AngupgradePage;

  beforeEach(() => {
    page = new AngupgradePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
