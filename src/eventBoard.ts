let imageMaterial = new Material()
imageMaterial.roughness = 1
imageMaterial.specularIntensity = 0

let board = new Entity()
board.addComponent(
  new Transform({
    position: new Vector3(8, 2, 8),
    scale: new Vector3(5, 4, 1),
  })
)
//board.addComponent(new Billboard())
board.addComponent(new PlaneShape())
engine.addEntity(board)

let title = new Entity()
title.setParent(board)
title.addComponent(new TextShape(''))
title.getComponent(TextShape).fontSize = 1
title.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
title.getComponent(TextShape).color = Color3.Black()
title.addComponent(
  new Transform({
    position: new Vector3(0, 0.4, -0.05),
  })
)

let coords = new Entity()
coords.setParent(board)
coords.addComponent(new TextShape(''))
coords.addComponent(
  new Transform({
    position: new Vector3(0, -0.4, -0.05),
  })
)
coords.getComponent(TextShape).fontSize = 1
coords.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
coords.getComponent(TextShape).color = Color3.Black()

let image = new Entity()
image.setParent(board)
image.addComponent(new PlaneShape())
image.addComponent(
  new Transform({
    position: new Vector3(0, 0, -0.05),
    scale: new Vector3(0.7, 0.7, 0.7),
    rotation: Quaternion.Euler(0, 0, 180),
  })
)
image.addComponent(imageMaterial)

export function displayEvent(event: any) {
  imageMaterial.albedoTexture = new Texture(
    'https://cors-anywhere.herokuapp.com/' + event.image
  )
  image.addComponentOrReplace(imageMaterial)
  let eventCoords = event.x.toString() + ',' + event.y.toString()
  title.getComponent(TextShape).value = event.name
  coords.getComponent(TextShape).value = eventCoords

  board.addComponentOrReplace(
    new OnPointerDown(
      (e) => {
        teleportTo(eventCoords)
      },
      { hoverText: 'Teleport to event' }
    )
  )
}
