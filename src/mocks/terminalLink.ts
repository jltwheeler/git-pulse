export default jest
  .fn()
  .mockImplementation((text: string, _url: string) => text);
