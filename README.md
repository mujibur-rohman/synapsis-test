#Synapsis Test
## Techstack

- Next Js v 14.2.4
- Tailwind CSS
- Tenstack React Query : To caching management data
- Axios : API Comminucation
- React Hook Form : Form State 
- Zod : Validation

## Folder Stucture

Semua source ditempatkan pada folder `src`
- /app : Semua halaman berada dalam folder ini sekaligus routingnya, ini adalah folder bawaan dari next js jika menggunakan Router App
- /components : Untuk menempatkan semua komponen yang akan di reuse pada halaman
- /config : Untuk hal-hal yang perlu dikonfigurasi, disini saya menempatkan axios config. 
- /hooks : Untuk menyimpan semua custom hook, disini saya membuat   useDebounce untuk mendelay aksi input onChange.
- /providers : Saya membuat query provider untuk react query.
- /schema : Untuk menyimpan schema user dan post form serta validasnya.
- /service : Pada folder ini saya membuat service API yang nantinya akan di fetching
- /utils : Di folder ini saya membuat library untuk pengkondisian CSS dan response error.
- /enum.ts : Untuk menyimpan enum data
- /types : Untuk menyiapkan semua struktur data dengan type dan interface
