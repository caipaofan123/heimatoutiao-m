import request from '@/utils/request';
import storage from '@/utils/storage';

const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  });
};

const getAllchannels = () => {
  return request({
    url: '/v1_0/channels'
  });
};
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS';
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS);
export const setMyChannelsToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel);
export { getMyChannels, getAllchannels };
