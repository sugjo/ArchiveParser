import { DownloaderHelper } from "node-downloader-helper";


async function start() {
	const toDownload: string[] = [];

	for (let index = 1; index <= 50; index++) {
		toDownload.push(`https://ufa.leroymerlin.ru/sitemap${index}.xml.gz`);
	}

	for await (const file of toDownload) {
		await download(file, file);
	}
}

function download(url: string, fileName: string) {
	return new Promise(function (resolve, reject) {
		new DownloaderHelper(url, "./download", {
			forceResume: false,
			override: true
		})
			.on("error", () => {}) // catch doesn't work without on error
			.on("end", () => resolve(fileName))
			.start()
			.catch((error: string) => reject(`${error} from ${fileName}`));
	});
}

start();