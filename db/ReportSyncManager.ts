import NetInfo from '@react-native-community/netinfo';
import {
  initPendingReportsTable,
  getAllPendingReports,
  removePendingReport,
} from '@db';

class ReportSyncManager {
  private static instance: ReportSyncManager;
  private isSending = false;
  private unsubscribe: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): ReportSyncManager {
    if (!ReportSyncManager.instance) {
      ReportSyncManager.instance = new ReportSyncManager();
    }

    return ReportSyncManager.instance;
  }

  public async start(): Promise<void> {
    initPendingReportsTable();

    if (this.unsubscribe) {
      return;
    }

    this.unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.flushPendingReports();
      }
    });

    const state = await NetInfo.fetch();

    if (state.isConnected) {
      await this.flushPendingReports();
    }
  }

  public stop(): void {
    if (!this.unsubscribe) {
      return;
    }

    this.unsubscribe();
    this.unsubscribe = null;
  }

  public async flushPendingReports(): Promise<void> {
    if (this.isSending) {
      return;
    }

    this.isSending = true;

    try {
      const reports = await getAllPendingReports();

      for (const {id} of reports) {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          await removePendingReport(id);
        } catch {
          break;
        }
      }
    } finally {
      this.isSending = false;
    }
  }
}

export default ReportSyncManager.getInstance();
