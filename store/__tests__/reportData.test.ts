import reportData from '../reportData';

import {Report} from '@types';

describe('reportData', () => {
  it('should be an array', () => {
    expect(Array.isArray(reportData)).toBe(true);
  });

  it('should contain report objects with required fields', () => {
    if (reportData.length > 0) {
      const firstReport = reportData[0];

      expect(firstReport).toHaveProperty('id');
      expect(firstReport).toHaveProperty('title');
      expect(firstReport).toHaveProperty('description');
      expect(firstReport).toHaveProperty('address');
      expect(firstReport).toHaveProperty('location');
      expect(firstReport).toHaveProperty('date');
      expect(firstReport).toHaveProperty('status');
      expect(firstReport).toHaveProperty('priority');

      expect(typeof firstReport.id).toBe('string');
      expect(typeof firstReport.title).toBe('string');
      expect(typeof firstReport.description).toBe('string');
      expect(typeof firstReport.address).toBe('string');
      expect(firstReport.date).toBeInstanceOf(Date);
      expect(typeof firstReport.location.latitude).toBe('number');
      expect(typeof firstReport.location.longitude).toBe('number');
    }
  });

  it('should have unique report IDs', () => {
    const ids = reportData.map((report: Report) => report.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid coordinates', () => {
    reportData.forEach((report: Report) => {
      expect(report.location.latitude).toBeGreaterThanOrEqual(-90);
      expect(report.location.latitude).toBeLessThanOrEqual(90);
      expect(report.location.longitude).toBeGreaterThanOrEqual(-180);
      expect(report.location.longitude).toBeLessThanOrEqual(180);
    });
  });

  it('should have valid dates', () => {
    reportData.forEach((report: Report) => {
      expect(report.date).toBeInstanceOf(Date);
      expect(isNaN(report.date.getTime())).toBe(false);
    });
  });
});
