import { RatpReelTimePage } from './app.po';

describe('ratp-reel-time App', function() {
  let page: RatpReelTimePage;

  beforeEach(() => {
    page = new RatpReelTimePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
