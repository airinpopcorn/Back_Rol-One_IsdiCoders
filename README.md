# PROYECTO FINAL - ROL-ONE

## Entidades

USER {
name: string,
email: string,
password: string,
role: string,
players: [idCharacter: ObjectId],
games: [id_Game: ObjectId]
}

GAME {
title: string,
creator: string,
description: string,
image: string,
characters:[idCharacter: ObjectId],
}

CHARACTER {
idGame: ObjectId,
name: string,
properties: {
experience: string,
sanity: string,
strength; string,
intelligence: string,
willingness: string,
ability: string,
violence: string
}
}
