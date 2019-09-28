import * as functions from "firebase-functions";

// Google Assistant deps
import { dialogflow, SimpleResponse, Carousel } from "actions-on-google";

// Firebase
import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://mangiare-nic.firebaseio.com"
});

const app = dialogflow();
const db = admin.firestore();

const getDishesByPricePoint = (agent: any) => {
  const price = agent.parameters.price;

  db.collection("dishes").onSnapshot(snapshot => {
    snapshot.forEach(doc => {
      if (doc.data().price <= price) {
      }
    });
  });
};

app.intent("foodSuggestion", conv => {
  conv.close(
    new SimpleResponse({
      text: "Sos grande Wilson",
      speech: "Wilson you are big"
    })
  );
  conv.close(
    new Carousel({
      items: {
        1: { title: "Messi", description: "Es grande" },
        2: { title: "Wilson", description: "Es más grande que Messi" }
      }
    })
  );
});
export const test = functions.https.onRequest(app);
