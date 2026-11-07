'use strict';

const Blockchain = require('./Blockchain');

function afficher(bloc) {
  console.log(`--- Bloc #${bloc.index} ---`);
  console.log(`  Timestamp    : ${bloc.timestamp} (${new Date(bloc.timestamp).toISOString()})`);
  console.log(`  Transaction  : ${bloc.transaction.expediteur} -> ${bloc.transaction.destinataire} : ${bloc.transaction.montant} FCFA`);
  console.log(`  PreviousHash : ${bloc.previousHash}`);
  console.log(`  Hash         : ${bloc.hash}`);
  console.log(`  Nonce        : ${bloc.nonce}`);
}

const bc = new Blockchain(3);
afficher(bc.chaine[0]);

[
  { expediteur: 'Kossi', destinataire: 'Ama', montant: 25000 },
  { expediteur: 'Ama', destinataire: 'Yao', montant: 10000 },
  { expediteur: 'Yao', destinataire: 'Kossi', montant: 5000 },
].forEach((tx) => afficher(bc.ajouterTransaction(tx)));

console.log('\nVerification :', bc.verifier().valide ? 'chaine integre' : 'chaine compromise');

console.log('\nFalsification : le montant du bloc #1 passe de 25000 a 250000.');
bc.chaine[1].transaction.montant = 250000;

const rapport = bc.verifier();
console.log('Verification :', rapport.valide ? 'chaine integre' : 'chaine compromise');
rapport.erreurs.forEach((e) => console.log(`  Bloc #${e.index} : ${e.message}`));

try {
  bc.ajouterTransaction({ expediteur: 'Kossi', destinataire: 'Ama', montant: 1000 });
} catch (e) {
  console.log(`\nAjout refuse [${e.code}] : ${e.message}`);
  console.log(`Blocs restants : ${bc.chaine.length} (nouveau bloc genese)`);
}
