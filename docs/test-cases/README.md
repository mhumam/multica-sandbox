# docs/test-cases

Folder ini punya agent **Test Designer** (📋 Nina). Isinya skenario test dalam bahasa
manusia, satu file per issue: `MUL-302.md`, `MUL-303.md`, dst.

Aturannya:

- Nina yang nulis. Nggak ada agent lain yang boleh ngedit file di sini — termasuk
  Test Implementer yang nggak setuju sama skenarionya.
- File di sini ditulis **sebelum** kode implementasinya ada.
- Test Implementer (🧪 Bagas) baca dari sini, dan nomor test-nya nyambung ke nomor
  skenario: `it('[3] ...')`.

Format lengkapnya ada di skill `test-case-format`.
