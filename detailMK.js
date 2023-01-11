    
    class Matkul {
        constructor(KodeMK, Info, Kurikulum) {
            this.KodeMK = KodeMK
            this.Info = Info
            this.Kurikulum = Kurikulum
        }
    }

    class Kelas extends Matkul {
        constructor(KodeMK, Info, Kurikulum, NamaKelas, IndexKelas, KodeRadio) {
            super(KodeMK, Info, Kurikulum);
            this.KodeMK = KodeMK
            this.Info = Info
            this.Kurikulum = Kurikulum
            this.NamaKelas = NamaKelas
            this.IndexKelas = IndexKelas
            this.KodeRadio = KodeRadio
        }
    }

    const KelasArr = []
    var Table1 = document.getElementsByClassName("box")[0]
    var Table2 = document.getElementsByClassName("box")[1]
    var Table3 = document.getElementsByClassName("box")[2]

    prosesJadwal(Table1)
    prosesJadwal(Table2)
    prosesJadwal(Table3)

    function prosesJadwal(Table) {
        for (var i = 0; i < Table.rows.length; i++) {
            if (Table.rows[i].cells[0].className=="sub border2 pad2") {
                var RawString = Table.rows[i].cells[0].textContent
                var KodeMK = RawString.slice(0, 10)
                var Info = RawString.slice(RawString.search("- ")+2,RawString.search("; "))
                var Kurikulum = RawString.slice(RawString.length-16, RawString.length)
                var IndexKelas = 0
                
                var button = document.createElement("a")
                button.innerHTML = 'Detail'
                button.href = 'https://academic.ui.ac.id/main/Course/Detail?course='+KodeMK+'&curr='+Kurikulum
                Table.rows[i].cells[0].innerHTML += "\t\t\t" 
                Table.rows[i].cells[0].appendChild(button)
            }
        }
    }

    function ekstrakInputUser() {
        const result = []
        console.log('ININ')
        for (var i = 0; i < KelasArr.length; i++) {
            if (document.getElementById('c'+i).checked) {
                result.push(document.querySelector('input[id="c'+i+'"]:checked').name)
            }
        }
        return result
    }