import TabelAbsensiKaryawan from '@/components/TabelAbsensiKaryawan'

const AbsensiKaryawan = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center border-b py-5 lg:p-5">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-black">
              Absensi Karyawan
            </h1>
            <p>Halaman ini digunakan monitoring absensi karyawan, silahkan pilih karyawan terlebih dahulu untuk melihat daftar absensi.</p>
          </div>
        </div>
        <TabelAbsensiKaryawan />
      </div>
    </div>
  )
}

export default AbsensiKaryawan