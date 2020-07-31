// @flow

import { UDFMapper } from 'udf-mapper';
import type { BoundEventUDFs } from 'udf-mapper';
import mappedUDFs from '../udfs.json';
import { eventId } from '../constants';

let udfMapper: UDFMapper | null = null;

export default function getBoundEventUDFs(): BoundEventUDFs {
  if (udfMapper === null) {
    udfMapper = new UDFMapper();
  }

  return udfMapper.getBoundEventUDFs(eventId, mappedUDFs);
}
