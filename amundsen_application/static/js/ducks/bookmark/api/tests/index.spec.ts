import axios, { AxiosResponse } from 'axios';

import { Bookmark } from 'interfaces';

import { addBookmark, getBookmarks, removeBookmark, API_PATH } from '../v0';

jest.mock('axios');

describe('addBookmark', () => {
  let mockPutResponse;
  let axiosMock;
  beforeAll(() => {
    mockPutResponse = {
      data: {
       bookmarks: [],
       msg: 'Success'
      },
      status: 200,
      statusText: '',
      headers: {},
      config: {}
    };
    axiosMock = jest.spyOn(axios, 'put').mockImplementation(() => Promise.resolve(mockPutResponse));
  });

  it('calls axios with correct parameters', async () => {
    expect.assertions(1);
    await addBookmark('test', 'table').then(data => {
      expect(axiosMock).toHaveBeenCalledWith(`${API_PATH}/user/bookmark`, { type: 'table', key: 'test' });
    });
  });

  it('returns response data', async () => {
    expect.assertions(1);
    await addBookmark('test', 'table').then(data => {
      expect(data).toEqual(mockPutResponse.data);
    });
  });

  afterAll(() => {
    axiosMock.mockClear();
  })
});

describe('getBookmarks', () => {
  let mockGetResponse;
  let axiosMock;
  beforeAll(() => {
    mockGetResponse = {
      data: {
       bookmarks: [],
       msg: 'Success'
      },
      status: 200,
      statusText: '',
      headers: {},
      config: {}
    };
    axiosMock = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockGetResponse));
  });

  it('calls axios with correct parameters if userId provided', async () => {
    expect.assertions(1);
    await getBookmarks('testUserId').then(data => {
      expect(axiosMock).toHaveBeenCalledWith(`${API_PATH}/user/bookmark?user_id=testUserId`);
    });
  });

  it('calls axios with correct parameters if userId not provided', async () => {
    expect.assertions(1);
    await getBookmarks().then(data => {
      expect(axiosMock).toHaveBeenCalledWith(`${API_PATH}/user/bookmark`);
    });
  });

  it('returns response data', async () => {
    expect.assertions(1);
    await getBookmarks('testUserId').then(data => {
      expect(data).toEqual(mockGetResponse.data);
    });
  });

  afterAll(() => {
    axiosMock.mockClear();
  });
});

describe('removeBookmark', () => {
  let mockDeleteResponse;
  let axiosMock;
  beforeAll(() => {
    mockDeleteResponse = {
      data: {
       resourceKey: 'test',
       resourceType: 'table',
       msg: 'Success'
      },
      status: 200,
      statusText: '',
      headers: {},
      config: {}
    };
    axiosMock = jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve(mockDeleteResponse));
  });

  it('calls axios with correct parameters', async () => {
    expect.assertions(1);
    await removeBookmark('testKey', 'table').then(data => {
      expect(axiosMock).toHaveBeenCalledWith(`${API_PATH}/user/bookmark`, { data: { type: 'table', key: 'testKey' }});
    });
  });

  it('returns response data', async () => {
    expect.assertions(1);
    await removeBookmark('test', 'table').then(data => {
      expect(data).toEqual(mockDeleteResponse.data);
    });
  });

  afterAll(() => {
    axiosMock.mockClear();
  });
});