import { StudentProfile } from '../types/student';
import { ApplicationRecord } from '../types/application';
import { UserSettings } from '../types/settings';
import { StoredDocumentMeta } from '../types/document';

export interface GrantlyExportData {
  version: string;
  exportedAt: string;
  profile: StudentProfile;
  savedScholarshipIds: string[];
  comparedScholarshipIds: string[];
  applications: ApplicationRecord[];
  documentsMeta?: StoredDocumentMeta[];
  settings: UserSettings;
}

export function exportGrantlyDataAsJson(
  profile: StudentProfile,
  savedScholarshipIds: string[],
  comparedScholarshipIds: string[],
  applications: ApplicationRecord[],
  documentsMeta: StoredDocumentMeta[],
  settings: UserSettings
): void {
  const exportPayload: GrantlyExportData = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    profile,
    savedScholarshipIds,
    comparedScholarshipIds,
    applications,
    documentsMeta,
    settings,
  };

  const jsonBlob = new Blob([JSON.stringify(exportPayload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(jsonBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `grantly-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

export function validateImportedData(parsed: any): parsed is GrantlyExportData {
  if (!parsed || typeof parsed !== 'object') return false;
  if (!parsed.profile || typeof parsed.profile !== 'object') return false;
  if (!Array.isArray(parsed.savedScholarshipIds)) return false;
  if (!Array.isArray(parsed.applications)) return false;
  return true;
}
