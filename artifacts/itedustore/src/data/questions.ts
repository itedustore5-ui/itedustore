export interface Question {
  id: number;
  subject: 'hardver' | 'os' | 'odrzavanje' | 'dokumentacija';
  subjectLabel: string;
  text: string;
  options: string[];
  answer: number;
  points: number;
}

export const SUBJECT_LABELS = {
  hardver: "Računarski hardver",
  os: "Operativni sistemi",
  odrzavanje: "Održavanje računarskih sistema",
  dokumentacija: "Tehnička dokumentacija"
};

export const questions: Question[] = [
  { id: 1, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Koja sabirnica se koristi za povezivanje grafičke kartice na matičnu ploču?", options: ["PCI", "PCIe x16", "AGP", "ISA"], answer: 1, points: 1 },
  { id: 2, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Šta je BIOS?", options: ["Operativni sistem", "Firmware koji inicijalizuje hardver pri pokretanju", "Program za formatiranje", "Antivirusni softver"], answer: 1, points: 1 },
  { id: 3, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Koja komponenta privremeno čuva podatke koji se trenutno obrađuju?", options: ["HDD", "SSD", "RAM", "ROM"], answer: 2, points: 1 },
  { id: 4, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Koje je glavno merilo brzine procesora?", options: ["Kapacitet", "Radni takt (Frekvencija)", "Napon", "Veličina tranzistora"], answer: 1, points: 1 },
  { id: 5, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Šta od navedenog je neizbrisiva memorija (ROM)?", options: ["DRAM", "SRAM", "EEPROM", "Cache"], answer: 2, points: 1 },
  { id: 6, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Koji od ovih interfejsa je najbrži za prenos podataka?", options: ["USB 2.0", "SATA III", "Thunderbolt 3", "IDE"], answer: 2, points: 1 },
  { id: 7, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Gde se fizički nalazi Cache memorija L1?", options: ["Na matičnoj ploči", "U RAM modulu", "Na čipu procesora", "Na grafičkoj kartici"], answer: 2, points: 1 },
  { id: 8, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Šta znači skraćenica SSD?", options: ["Solid State Drive", "System Storage Disk", "Static Sector Disk", "Serial System Device"], answer: 0, points: 1 },
  { id: 9, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Koliko pinova obično ima savremeni ATX konektor za napajanje matične ploče?", options: ["16", "20", "24", "32"], answer: 2, points: 1 },
  { id: 10, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Koji uređaj služi za pretvaranje digitalnog signala u analogni?", options: ["Ruter", "Modem", "Mrežna kartica", "Switch"], answer: 1, points: 1 },
  { id: 11, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Koji port se najčešće koristi za povezivanje modernog monitora?", options: ["VGA", "DVI", "HDMI / DisplayPort", "PS/2"], answer: 2, points: 1 },
  { id: 12, subject: 'hardver', subjectLabel: SUBJECT_LABELS.hardver, text: "Šta označava termin 'Overclocking'?", options: ["Smanjenje radnog takta radi uštede energije", "Povećanje radnog takta procesora iznad fabričkih specifikacija", "Dodavanje više RAM memorije", "Instalacija novog operativnog sistema"], answer: 1, points: 1 },

  { id: 13, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Koji fajl sistem koristi Linux po defaultu?", options: ["FAT32", "NTFS", "ext4", "exFAT"], answer: 2, points: 1 },
  { id: 14, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Šta je proces u kontekstu operativnih sistema?", options: ["Program koji se trenutno izvršava", "Deo hardvera", "Softver za obradu teksta", "Sistemski folder"], answer: 0, points: 1 },
  { id: 15, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Koja je glavna funkcija operativnog sistema?", options: ["Pisanje koda", "Upravljanje hardverom i softverom", "Kreiranje web stranica", "Dizajniranje grafike"], answer: 1, points: 1 },
  { id: 16, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Koji je podrazumevani fajl sistem za moderne Windows operativne sisteme?", options: ["FAT16", "NTFS", "HFS+", "APFS"], answer: 1, points: 1 },
  { id: 17, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Koja komanda se koristi u Linuxu za promenu prava pristupa fajlovima?", options: ["chown", "chmod", "chgrp", "mkdir"], answer: 1, points: 1 },
  { id: 18, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Šta je to 'Deadlock' (Mrtva petlja)?", options: ["Sistemski alat za defragmentaciju", "Stanje kada dva ili više procesa beskonačno čekaju jedan drugog", "Zaraza računara virusom", "Greška u BIOS-u"], answer: 1, points: 1 },
  { id: 19, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Koji alat u Windows-u se koristi za pregled aktivnih procesa?", options: ["Task Manager", "Control Panel", "Device Manager", "Registry Editor"], answer: 0, points: 1 },
  { id: 20, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Šta znači termin 'Multitasking'?", options: ["Posedovanje više monitora", "Sposobnost OS-a da istovremeno izvršava više zadataka", "Više korisnika na istom računaru", "Višestruko kopiranje fajlova"], answer: 1, points: 1 },
  { id: 21, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "U kojem direktorijumu se u Linuxu obično nalaze sistemske konfiguracione datoteke?", options: ["/bin", "/home", "/etc", "/usr"], answer: 2, points: 1 },
  { id: 22, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Šta je 'Pagefile' ili 'Swap' prostor?", options: ["Deo RAM-a rezervisan za OS", "Virtuelna memorija na hard disku", "Arhiva obrisanih fajlova", "Skrivena particija za boot"], answer: 1, points: 1 },
  { id: 23, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Koja od navedenih verzija Linuxa je namenjena prvenstveno serverima?", options: ["Ubuntu Desktop", "Linux Mint", "CentOS Server", "Pop!_OS"], answer: 2, points: 1 },
  { id: 24, subject: 'os', subjectLabel: SUBJECT_LABELS.os, text: "Šta je Shell u operativnim sistemima?", options: ["Grafički interfejs", "Korisnički interfejs komandne linije (CLI)", "Antivirusni modul", "Hardverska zaštita"], answer: 1, points: 1 },

  { id: 25, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Koji je prvi korak pri dijagnostici kvara na računaru?", options: ["Reinstalacija OS-a", "Fizička provera kablova i napajanja", "Formatiranje hard diska", "Zamena RAM memorije"], answer: 1, points: 1 },
  { id: 26, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Šta označava zvučni signal (Beep code) pri uključivanju računara?", options: ["Završetak učitavanja OS-a", "Rezultat POST (Power-On Self-Test) procedure", "Upozorenje o slaboj bateriji", "Pristup internetu"], answer: 1, points: 1 },
  { id: 27, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Zašto se koristi termalna pasta?", options: ["Za povezivanje matične ploče i kućišta", "Za bolje odvođenje toplote sa procesora na hladnjak", "Za smanjenje buke ventilatora", "Za izolaciju kablova"], answer: 1, points: 1 },
  { id: 28, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Koji alat se koristi za proveru ispravnosti RAM memorije?", options: ["MemTest86", "Disk Cleanup", "Ping", "Traceroute"], answer: 0, points: 1 },
  { id: 29, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Šta je S.M.A.R.T. tehnologija?", options: ["Tehnologija za bežično povezivanje", "Sistem za rano otkrivanje kvarova na hard diskovima i SSD-ovima", "Alat za ubrzavanje procesora", "Softver za čišćenje virusa"], answer: 1, points: 1 },
  { id: 30, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Ako računar uopšte ne reaguje na pritisak dugmeta za paljenje, šta je najverovatniji uzrok?", options: ["Pokvaren hard disk", "Nedostatak OS-a", "Kvar napajanja ili kabla", "Loša termalna pasta"], answer: 2, points: 1 },
  { id: 31, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Šta radi alat 'Defragmenter'?", options: ["Briše viruse", "Organizuje fragmentisane fajlove na hard disku za brži pristup", "Popravlja RAM greške", "Reinstalira drajvere"], answer: 1, points: 1 },
  { id: 32, subject: 'odrzavanje', subjectLabel: SUBJECT_LABELS.odrzavanje, text: "Kako se naziva proces redovnog kreiranja kopija podataka radi zaštite od gubitka?", options: ["Defragmentacija", "Backup", "Formatiranje", "Kloniranje"], answer: 1, points: 1 },

  { id: 33, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Čemu služi projektna dokumentacija u IT-u?", options: ["Samo za evidenciju troškova", "Za opis arhitekture, funkcija i održavanja sistema", "Za reklamiranje proizvoda", "Nema praktičnu namenu"], answer: 1, points: 1 },
  { id: 34, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Šta je UML?", options: ["Unified Modeling Language - jezik za vizuelno modelovanje sistema", "Universal Memory Locator", "Mrežni protokol", "Vrsta baze podataka"], answer: 0, points: 1 },
  { id: 35, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Koja je svrha korisničkog uputstva?", options: ["Da objasni kod programerima", "Da pomogne krajnjem korisniku u korišćenju softvera ili hardvera", "Da definiše budžet projekta", "Da testira performanse"], answer: 1, points: 1 },
  { id: 36, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Šta je Gantogram (Gantt chart)?", options: ["Dijagram baze podataka", "Alat za vizuelizaciju rasporeda i trajanja zadataka u projektu", "Shema matične ploče", "Algoritam za sortiranje"], answer: 1, points: 1 },
  { id: 37, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Šta predstavlja Use Case dijagram?", options: ["Interakciju korisnika sa sistemom i funkcije sistema", "Fizički raspored kablova", "Dijagram klasa", "Finansijski izveštaj"], answer: 0, points: 1 },
  { id: 38, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Šta obuhvata tehnička specifikacija sistema?", options: ["Samo korisnički interfejs", "Hardverske zahteve, softverske zahteve, mrežnu arhitekturu", "Marketing strategiju", "Pravila oblačenja zaposlenih"], answer: 1, points: 1 },
  { id: 39, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Koji standard se često koristi za dokumentaciju softverskih zahteva?", options: ["ISO 9001", "IEEE 29148 (ranije IEEE 830)", "ISO 14001", "OSI model"], answer: 1, points: 1 },
  { id: 40, subject: 'dokumentacija', subjectLabel: SUBJECT_LABELS.dokumentacija, text: "Šta je API dokumentacija?", options: ["Uputstvo za programere o tome kako da koriste određeni programski interfejs (API)", "Dokumentacija o kupovini hardvera", "Pravilnik o bezbednosti na radu", "Uputstvo za instalaciju OS-a"], answer: 0, points: 1 }
];
