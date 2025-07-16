import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

import {getPendingReportsFromStorage, removePendingReport} from '@db';

class ReportSyncManager {
  private static instance: ReportSyncManager;
  private isSending = false;
  private unsubscribe: (() => void) | null = null;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): ReportSyncManager {
    if (!ReportSyncManager.instance) {
      ReportSyncManager.instance = new ReportSyncManager();
    }

    return ReportSyncManager.instance;
  }

  public async start(): Promise<void> {
    if (this.isInitialized) {
      console.warn('ReportSyncManager is already initialized');
      return;
    }

    try {
      this.setupNetworkListener();

      const {isConnected} = await NetInfo.fetch();
      await this.handleConnectionChange(isConnected);

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to start ReportSyncManager:', error);
      throw error;
    }
  }

  public stop(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    this.isInitialized = false;
  }

  private setupNetworkListener(): void {
    this.unsubscribe = NetInfo.addEventListener(
      async ({isConnected}: NetInfoState) =>
        await this.handleConnectionChange(isConnected),
    );
  }

  private async handleConnectionChange(
    isConnected: boolean | null,
  ): Promise<void> {
    if (!isConnected) {
      return;
    }

    try {
      await this.flushPendingReports();
    } catch (error) {
      console.error('Error flushing pending reports:', error);
    }
  }

  public async flushPendingReports(): Promise<void> {
    if (this.isSending) {
      return;
    }

    this.isSending = true;

    try {
      const reports = await getPendingReportsFromStorage();

      if (reports.length === 0) {
        return;
      }

      for (const {id} of reports) {
        try {
          await this.simulateReportSync();
          await removePendingReport(id);
        } catch (error) {
          console.error(`Failed to sync report ${id}:`, error);
          break;
        }
      }
    } catch (error) {
      console.error('Error during pending reports flush:', error);
    } finally {
      this.isSending = false;
    }
  }

  private async simulateReportSync(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export default ReportSyncManager.getInstance();
