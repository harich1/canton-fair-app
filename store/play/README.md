# FairNote 1.0 Play Store package

## Upload assets

- `assets/icon-512.png`: high-resolution app icon, 512×512
- `assets/feature-graphic-1024x500.png`: feature graphic, 1024×500
- `assets/phone/01-onboarding-ko.png`: no-account onboarding, 1080×1920
- `assets/phone/02-product-list-ko.png`: product review list, 1080×1920
- `assets/phone/03-capture-ko.png`: overseas sourcing capture form, 1080×1920
- `assets/phone/04-settings-export-ko.png`: templates, languages and export, 1080×1920
- `store-listing.md`: Korean, English and Simplified Chinese store copy
- `release-notes.md`: 1.0 release notes in all three languages

The records and product illustrations in the screenshots are fictional demo data created only for the store listing.

## Build

Upload `FairNote-1.0.aab` from `D:\FairNote-Releases\1.0` to an internal testing release first.

- Package: `com.harich1.fairnote`
- Version name: `1.0`
- Version code: `1`
- Minimum SDK: 24
- Target SDK: 36
- AAB SHA-256: `61ED7D708ED674846BB1677BD5A1A6F1D5F22E96F97DC8502DC35E87BEE4E8EF`

The release bundle is signed with the FairNote upload certificate and was verified with `jarsigner`.

Do not upload or share the files under `D:\Android\keys`. Keep the upload keystore and its properties file in a separate encrypted backup.
