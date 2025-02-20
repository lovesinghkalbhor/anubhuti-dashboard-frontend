import { notifyUpdate } from "../components/notify";
const updateNotifier = () => {
  (window as any).electronAPI.onCheckingUpdate(() => {
    notifyUpdate("Checking for updates...", "info");
  });

  (window as any).electronAPI.onUpdateAvailable((info: any) => {
    console.log(info, "Checking for updates");
    notifyUpdate(`Update available! Version: ${info.version}`, "warning");
  });

  (window as any).electronAPI.onUpdateNotAvailable(() => {
    notifyUpdate("No new updates found.", "info");
  });

  (window as any).electronAPI.onUpdateDownloaded(() => {
    notifyUpdate("Update downloaded! Restarting app...", "success");
  });

  (window as any).electronAPI.onError((info: any) => {
    console.log(info);

    notifyUpdate(`Update error: ${info}`, "error", info.message);
  });
};

export default updateNotifier;
