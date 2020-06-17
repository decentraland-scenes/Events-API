import { splitTextIntoLines, shortenText } from './utils'

let imageMaterial = new Material()
imageMaterial.roughness = 1
imageMaterial.specularIntensity = 0

let invisibleMaterial = new Material()
invisibleMaterial.albedoColor = new Color4(0, 0, 0, 0)

let boardBase = new Entity()
boardBase.addComponent(
  new Transform({
    position: new Vector3(8, 2.5, 8),
  })
)
engine.addEntity(boardBase)

let board = new Entity()
board.addComponent(
  new Transform({
    scale: new Vector3(5, 4.5, 1),
  })
)
//board.addComponent(new Billboard())
board.addComponent(new PlaneShape())
board.setParent(boardBase)

let header = new Entity()

header.addComponent(new TextShape('Events happening now!'))
header.getComponent(TextShape).fontSize = 4
header.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
header.getComponent(TextShape).color = Color3.Red()
//title.getComponent(TextShape).
header.getComponent(TextShape).hTextAlign = 'center'
//title.getComponent(TextShape).textWrapping = true

header.addComponent(
  new Transform({
    position: new Vector3(0, 1.8, -0.05),
  })
)
header.setParent(boardBase)

let title = new Entity()
title.setParent(boardBase)
title.addComponent(new TextShape(''))
title.getComponent(TextShape).fontSize = 3
title.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
title.getComponent(TextShape).color = Color3.Black()
//title.getComponent(TextShape).
title.getComponent(TextShape).hTextAlign = 'left'
//title.getComponent(TextShape).textWrapping = true
title.getComponent(TextShape).lineCount = 2
title.getComponent(TextShape).height = 2
title.getComponent(TextShape).width = 8
title.addComponent(
  new Transform({
    position: new Vector3(-2.2, 1.1, -0.05),
  })
)

let coords = new Entity()
coords.setParent(boardBase)
coords.addComponent(new TextShape(''))
coords.addComponent(
  new Transform({
    position: new Vector3(-2.2, -2, -0.05),
  })
)
coords.getComponent(TextShape).fontSize = 2
coords.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
coords.getComponent(TextShape).color = Color3.Black()
coords.getComponent(TextShape).hTextAlign = 'left'

let image = new Entity()
image.setParent(boardBase)
image.addComponent(new PlaneShape())
image.addComponent(
  new Transform({
    position: new Vector3(0, -0.6, -0.05),
    scale: new Vector3(4.5, 2.25, 1),
    rotation: Quaternion.Euler(0, 0, 180),
  })
)
image.addComponent(imageMaterial)

let clickPanel = new Entity()
clickPanel.addComponent(invisibleMaterial)
clickPanel.addComponent(new PlaneShape())
clickPanel.addComponent(
  new Transform({
    scale: new Vector3(5, 4.5, 1),
    position: new Vector3(0, 0, -0.2),
  })
)
clickPanel.setParent(boardBase)

export function displayEvent(event: any) {
  imageMaterial.albedoTexture = new Texture(
    'https://cors-anywhere.herokuapp.com/' + event.image
  )
  image.addComponentOrReplace(imageMaterial)
  let eventCoords = event.x.toString() + ',' + event.y.toString()
  if (event.scene_name) {
    eventCoords = eventCoords + ' (' + shortenText(event.scene_name, 25) + ')'
  }

  title.getComponent(TextShape).value = splitTextIntoLines(event.name, 28)
  coords.getComponent(TextShape).value = 'At: ' + eventCoords
  clickPanel.addComponentOrReplace(
    new OnPointerDown(
      (e) => {
        teleportTo(eventCoords)
      },
      { hoverText: 'Teleport to event' }
    )
  )
}
