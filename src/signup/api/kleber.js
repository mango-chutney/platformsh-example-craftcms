// @flow

import { stringify as paramify } from 'query-string';
import unfetch from 'unfetch';
import { baseURL, departmentCode, kleberApiUrl } from '../constants';

export default ({ fetch }: { fetch: fetch } = { fetch: unfetch }) => {
  const getKleberRequestKey = (): Promise<string> =>
    fetch(`${baseURL}/kleber/generate-temporary-request-key.php`)
      .then(response => response.json())
      .then(json => json.DtResponse.Result[0].TemporaryRequestKey);

  const makeThrowawayKleberRequest = ({
    kleberRequestKey,
    recordId,
  }: {
    kleberRequestKey: string,
    recordId: string,
  }): Promise<any> => {
    const params = {
      DepartmentCode: departmentCode,
      Method: 'DataTools.Capture.Address.Predictive.AuPaf.RetrieveAddress',
      RecordId: recordId,
      OutputFormat: 'json',
      RequestKey: kleberRequestKey,
    };
    return fetch(
      `${kleberApiUrl}/ProcessQueryStringRequest?${paramify(params)}`,
    ).then(response => response.json());
  };

  const getAddressData = ({
    address,
    kleberRequestKey,
  }: {
    address: string,
    kleberRequestKey: string,
  }): Promise<any> => {
    const params = {
      OutputFormat: 'json',
      ResultLimit: 5,
      AddressLine: address,
      Method: 'DataTools.Capture.Address.Predictive.AuPaf.SearchAddress',
      RequestKey: kleberRequestKey,
      DepartmentCode: departmentCode,
    };

    return fetch(
      `${kleberApiUrl}/ProcessQueryStringRequest?${paramify(params)}`,
    )
      .then(response => response.json())
      .then(json =>
        Promise.resolve(
          json.DtResponse.Result.length >= 1 ? json.DtResponse : [],
        ),
      );
  };

  return { getAddressData, getKleberRequestKey, makeThrowawayKleberRequest };
};
