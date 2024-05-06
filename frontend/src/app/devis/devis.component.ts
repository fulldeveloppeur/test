import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { SouscriptionService } from '../service/souscription.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';

@Component({
  selector: 'app-devis',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.css',
})
export class DevisComponent {
  informationsGeneralesForm = new FormGroup({
    numOpportunite: new FormControl(''),
    refDossier: new FormControl(''),
    siren: new FormControl(''),
    nomClient: new FormControl(''),
    affaire: new FormControl(''),
    intermediaire: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(),
    presenceCoassurance: new FormControl(false),
  });

  CaracteristiquesTechniquesForm = new FormGroup({
    adresse: new FormControl(''),
    descriptifDetaille: new FormControl(''),
    tarif: new FormControl(''),
    planImage: new FormControl(''),
  });
   @ViewChild('autosize') autosize: CdkTextareaAutosize | any;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  souscription: any

  constructor(private souscriptionService: SouscriptionService, private _ngZone: NgZone) {}

  onImagePicked(event: any) {
    const file = <HTMLInputElement>event?.target?.files[0];
    this.informationsGeneralesForm.patchValue({ image: file  });
  }

  submit() {
     this.souscription = {
      ...this.informationsGeneralesForm.value,
      ...this.CaracteristiquesTechniquesForm.value,
    };
    this.souscriptionService.postSouscription(this.souscription);
  }
  generatePdforDoc(pdf: string) {
     const date = new Date()
    if (pdf === 'docx') {
        var blob = new Blob([`
        id: ${this.souscription.id}
        refDossier: ${this.souscription.refDossier}
        siren: ${this.souscription.siren}
        adresse: ${this.souscription.adresse}
        numOpportunite: ${this.souscription.numOpportunite}
        nomClient: ${this.souscription.nomClient}
        tarif: ${this.souscription.tarif}
        affaire: ${this.souscription.affaire}
        intermediaire: ${this.souscription.intermediaire}
        description: ${this.souscription.description}
        pesenceCoassurance: ${this.souscription.presenceCoassurance}
        descriptifDetaille: ${this.souscription.descriptifDetaille}
        `], {type: "text/plain;charset=utf-8"});
    saveAs(blob, `Projet de contrat_${this.souscription.numOpportunite}_${date}.docx`);
    }
    else {
      let pdf = new jsPDF()
     pdf.text(`
        id: ${this.souscription._id}
        refDossier: ${this.souscription.refDossier}
        siren: ${this.souscription.siren}
        adresse: ${this.souscription.adresse}
        numOpportunite: ${this.souscription.numOpportunite}
        nomClient: ${this.souscription.nomClient}
        tarif: ${this.souscription.tarif}
        affaire: ${this.souscription.affaire}
        intermediaire: ${this.souscription.intermediaire}
        description: ${this.souscription.description}
        pesenceCoassurance: ${this.souscription.presenceCoassurance}
        descriptifDetaille: ${this.souscription.descriptifDetaille}
     `,10,10)
    pdf.save(`Projet de contrat_${this.souscription.numOpportunite}_${date}.pdf`); 

    }

   
  }

}
