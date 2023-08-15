import { downloadFile } from '@huggingface/hub'
import type { RepoDesignation } from "@huggingface/hub";

export const FileDownloader = async (modelRepo: string, filePath: string) =>
{
    var octetStreamMime = 'application/octet-stream';
    // const repo: RepoDesignation = { type: "model", name: "TheBloke/orca_mini_v3_7B-GGML" };
    // const response = await downloadFile({ repo, path: "orca_mini_v3_7b.ggmlv3.q2_K.bin" });
    const repo: RepoDesignation = { type: "model", name: modelRepo };
    const response = await downloadFile({ repo, path: filePath });

    if (response && response.status === 200) {
        try {
            var blob = await response.blob();

            // TODO
        } catch (exc) {
            console.log("Save Blob method failed with the following exception.");
            console.log(exc);
        }
    } else {
        throw new Error(`Failed to download file from ${repo.name}`);
    }
}
