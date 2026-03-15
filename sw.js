// Streamr Ad Blocker Service Worker
// Blocks known ad/popup domains

const AD_DOMAINS = [
  'doubleclick.net','googlesyndication.com','adservice.google.com',
  'googleadservices.com','ads.yahoo.com','advertising.com',
  'adnxs.com','adsrvr.org','rubiconproject.com','openx.net',
  'pubmatic.com','casalemedia.com','criteo.com','taboola.com',
  'outbrain.com','revcontent.com','mgid.com','popcash.net',
  'popads.net','popadvert.com','trafficjunky.com','traffichaus.com',
  'exoclick.com','juicyads.com','adspyglass.com','plugrush.com',
  'hilltopads.net','adsterra.com','propellerads.com','zeropark.com',
  'clickadu.com','adcash.com','evadav.com','richpush.co',
  'kadam.net','pushground.com','monetizemore.com','valueimpression.com',
  'yllix.com','adskeeper.com','bidvertiser.com','infolinks.com',
  'adf.ly','shorte.st','ouo.io','bc.vc','linkbucks.com',
  'go.redirectingat.com','popup.re','pops.best','popdollar.net',
  'track.soclmtr.com','jsc.mgid.com','a.ad.gt','go.lncld.net',
  'track.adform.net','cdn.adtelligent.com','ads.themoviedb.org',
  'tpc.googlesyndication.com','pagead2.googlesyndication.com',
  'securepubads.g.doubleclick.net','adserver.adtech.de',
  'ads.undertone.com','serve.popads.net','c.popcash.net',
  'banners.trafficjunky.net','ads2.trafficjunky.net',
  'ads3.trafficjunky.net','static.exoclick.com','server.exposedads.com',
  'creatives.exoclick.com','syndication.exoclick.com',
  'bsnerdythings.com','trk.streamhide.com','get-data.live',
  'go-g.to','1337x.to','redir.top','shortlink.to','top4top.io',
  'youporn.com','pornhub.com','xvideos.com','xhamster.com',
  'redtube.com','beeg.com','xnxx.com','tube8.com','spankbang.com',
  'tnaflix.com','drtuber.com','porntrex.com','hclips.com',
  'sexvid.xxx','freeones.com','chaturbate.com','myfreecams.com',
  'streamate.com','livejasmin.com','flirt4free.com','imlive.com',
];

self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });

self.addEventListener('fetch', e => {
  const url = e.request.url.toLowerCase();
  const blocked = AD_DOMAINS.some(domain => url.includes(domain));
  if (blocked) {
    e.respondWith(new Response('', { status: 200, statusText: 'Blocked by Streamr AdBlocker' }));
    return;
  }
  // Block suspicious redirect patterns
  if (url.includes('popup') || url.includes('popunder') || url.includes('clickunder')) {
    e.respondWith(new Response('', { status: 200 }));
    return;
  }
});
