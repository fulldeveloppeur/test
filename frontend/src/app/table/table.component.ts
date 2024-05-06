import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SouscriptionService } from '../service/souscription.service';
import { MatIconModule } from '@angular/material/icon';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  constructor(private souscriptionService: SouscriptionService) {
    this.getAllDevis();
  }

  ngOnInit(): void {
    // this.getAllDevis();
  }

  getAllDevis() {
    this.souscriptionService.getAllDevis().subscribe((devis: any) => {
      this.dataSource = new MatTableDataSource(devis);
    });
  }

  displayedColumns: string[] = [
    'refDossier',
    'siren',
    'numOpportunite',
    'tarif',
    'nomClient',
    'adresse',
    'pdf',
  ];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPdf(element: any) {
    let pdf = new jsPDF()
     pdf.text(`
        id: ${element._id}
       refDossier: ${element.refDossier}
        siren: ${element.siren}
        adresse: ${element.adresse}
        numOpportunite: ${element.numOpportunite}
        nomClient: ${element.nomClient}
        tarif: ${element.tarif}
        affaire: ${element.affaire}
        intermediaire: ${element.intermediaire}
        description: ${element.description}
        pesenceCoassurance: ${element.presenceCoassurance}
        descriptifDetaille: ${element.descriptifDetaille}
     `,10,10)
    pdf.save(`${element.nomClient}.pdf`); 
  }
}
