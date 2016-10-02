import { Migration3Page } from './app.po';

describe('migration3 App', function() {
  let page: Migration3Page;

  beforeEach(() => {
    page = new Migration3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
