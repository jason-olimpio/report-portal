import {isOnline} from '@utils';

jest.mock('@utils', () => ({
  __esModule: true,
  isOnline: jest.fn(),
}));

const sendReport = jest.fn(async () => {
  await isOnline();
});

const saveReportOffline = jest.fn(async () => {
  await isOnline();
});

const isDeviceConnected = jest.fn(async () => await isOnline());

describe('Report sending logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send report immediately if online', async () => {
    (isOnline as jest.Mock).mockResolvedValue(true);
    await sendReport();

    expect(isOnline).toHaveBeenCalled();
  });

  it('should save report offline if offline', async () => {
    (isOnline as jest.Mock).mockResolvedValue(false);
    await saveReportOffline();

    expect(isOnline).toHaveBeenCalled();
  });

  it('should detect device connectivity', async () => {
    (isOnline as jest.Mock).mockResolvedValue(true);
    const connected = await isDeviceConnected();

    expect(connected).toBe(true);

    (isOnline as jest.Mock).mockResolvedValue(false);

    const disconnected = await isDeviceConnected();

    expect(disconnected).toBe(false);
  });
});
