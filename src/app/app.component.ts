import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent { 

  dnaInput: string[][] = [
    ['A', 'T', 'G', 'C', 'G', 'A'],
    ['C', 'A', 'G', 'T', 'G', 'C'],
    ['T', 'T', 'A', 'T', 'G', 'T'],
    ['A', 'G', 'A', 'A', 'G', 'G'],
    ['C', 'C', 'C', 'C', 'T', 'A'],
    ['T', 'C', 'A', 'C', 'T', 'G']
  ];

  isMutant(dna: string[][]): boolean {    
    let contador = 0;
    // verifica cada forma
    contador += this.esMutante(dna, 1) ? 1:0;
    contador += this.esMutante(dna, 1) ? 1:0;
    contador += this.esMutante(dna, 1) ? 1:0;
    return contador >= 2;
  }
  
  resultMessage = '';

  checkMutant() {    
    const isHumanMutant = this.isMutant( this.dnaInput);
    this.resultMessage = isHumanMutant
      ? 'El humano es mutante.'
      : 'El humano NO es mutante.';
  }


  esMutante(dna: any[][], tipo: number){
    const n = dna.length; 
    const targetSequences = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];
    switch (tipo) {
      case 1:
        for (let i = 0; i < n; i++) {
          const row = dna[i].join(''); // Concatenar la fila en una cadena
          for (const sequence of targetSequences) {
            if (row.includes(sequence)) {
              return true; // Se encontró una de las secuencias
            }
          }
        }  
        return false;         
      case 2:
        for (let j = 0; j < n; j++) {
          let column = '';
          for (let i = 0; i < n; i++) {
            column += dna[i][j]; 
          }
          for (const sequence of targetSequences) {
            if (column.includes(sequence)) {
              return true; 
            }
          }
        }      
        return false;             
      case 3:
        // Verificar diagonal derecha
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let diagonal = '';
      for (let k = 0; k < n; k++) {
        if (i + k < n && j + k < n) {
          diagonal += dna[i + k][j + k]; // Concatenar elementos de la diagonal derecha
        }
      }
      for (const sequence of targetSequences) {
        if (diagonal.includes(sequence)) {
          return true; 
        }
      }
    }
  }
  // Verificar diagonal izquierda
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let diagonal = '';
      for (let k = 0; k < n; k++) {
        if (i + k < n && j - k >= 0) {
          diagonal += dna[i + k][j - k]; // Concatenar elementos de la diagonal izquierda
        }
      }
      for (const sequence of targetSequences) {
        if (diagonal.includes(sequence)) {
          return true; 
        }
      }
    }
  }
  return false;    
      default:
        return false;      
    }
  }

}