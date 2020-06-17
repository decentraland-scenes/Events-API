import { splitTextIntoLines, shortenText } from './utils'

let imageMaterial = new Material()
imageMaterial.roughness = 1
imageMaterial.specularIntensity = 0

let invisibleMaterial = new Material()
invisibleMaterial.albedoColor = new Color4(0, 0, 0, 0)

let inactiveEventMaterial = new Material()
inactiveEventMaterial.roughness = 1
inactiveEventMaterial.specularIntensity = 0
inactiveEventMaterial.albedoTexture = new Texture('images/gray.png')
inactiveEventMaterial.alphaTexture = new Texture('images/gray.png')

let activeEventMaterial = new Material()
activeEventMaterial.roughness = 1
activeEventMaterial.specularIntensity = 0
activeEventMaterial.albedoTexture = new Texture('images/red.png')
activeEventMaterial.alphaTexture = new Texture('images/red.png')

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
    //scale: new Vector3(5, 4.5, 1),
  })
)
board.addComponent(new GLTFShape('models/events-UI.glb'))
board.setParent(boardBase)

let image = new Entity()
image.addComponent(new PlaneShape())
image.addComponent(
  new Transform({
    position: new Vector3(0, 0.4, -0.05),
    scale: new Vector3(4.25, 2.125, 1),
    rotation: Quaternion.Euler(0, 0, 180),
  })
)
image.addComponent(imageMaterial)
image.setParent(boardBase)

let imageBackSide = new Entity()
imageBackSide.addComponent(new PlaneShape())
imageBackSide.addComponent(
  new Transform({
    position: new Vector3(0, 0.4, 0.05),
    scale: new Vector3(4.25, 2.125, 1),
    rotation: Quaternion.Euler(0, 180, 180),
  })
)
imageBackSide.addComponent(imageMaterial)
imageBackSide.setParent(boardBase)

let title = new Entity()
title.addComponent(new TextShape(''))
title.getComponent(TextShape).fontSize = 3
title.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
title.getComponent(TextShape).color = Color3.Black()
title.getComponent(TextShape).hTextAlign = 'left'
title.getComponent(TextShape).lineCount = 2
title.getComponent(TextShape).height = 2
title.getComponent(TextShape).width = 8
title.addComponent(
  new Transform({
    position: new Vector3(-2, -1.1, -0.05),
  })
)
title.setParent(boardBase)

let titleBackSide = new Entity()
titleBackSide.addComponent(new TextShape(''))
titleBackSide.getComponent(TextShape).fontSize = 3
titleBackSide.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
titleBackSide.getComponent(TextShape).color = Color3.Black()
titleBackSide.getComponent(TextShape).hTextAlign = 'left'
titleBackSide.getComponent(TextShape).lineCount = 2
titleBackSide.getComponent(TextShape).height = 2
titleBackSide.getComponent(TextShape).width = 8
titleBackSide.addComponent(
  new Transform({
    position: new Vector3(2, -1.1, 0.05),
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
titleBackSide.setParent(boardBase)

let coords = new Entity()
coords.addComponent(new TextShape(''))
coords.addComponent(
  new Transform({
    position: new Vector3(-1.75, -1.55, -0.05),
  })
)
coords.getComponent(TextShape).fontSize = 2
coords.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
coords.getComponent(TextShape).color = Color3.Black()
coords.getComponent(TextShape).hTextAlign = 'left'
coords.setParent(boardBase)

let coordsBackSide = new Entity()
coordsBackSide.addComponent(new TextShape(''))
coordsBackSide.addComponent(
  new Transform({
    position: new Vector3(1.75, -1.55, 0.05),
    rotation: Quaternion.Euler(0, 180, 0),
  })
)
coordsBackSide.getComponent(TextShape).fontSize = 2
coordsBackSide.getComponent(TextShape).font = new Font(Fonts.SanFrancisco)
coordsBackSide.getComponent(TextShape).color = Color3.Black()
coordsBackSide.getComponent(TextShape).hTextAlign = 'left'
coordsBackSide.setParent(boardBase)

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

let clickPanelBackSide = new Entity()
clickPanelBackSide.addComponent(invisibleMaterial)
clickPanelBackSide.addComponent(new PlaneShape())
clickPanelBackSide.addComponent(
  new Transform({
    scale: new Vector3(5, 4.5, 1),
    position: new Vector3(0, 0, 0.2),
  })
)
clickPanelBackSide.setParent(boardBase)

let dots = []
let dotsBackSide = []

export function createDots(dotAmount: number) {
  for (let i = 0; i < dotAmount; i++) {
    let offset = (i - dotAmount / 2) * 0.1
    let dot = new Entity()
    dot.addComponent(new PlaneShape())
    dot.addComponent(inactiveEventMaterial)
    dot.addComponent(
      new Transform({
        position: new Vector3(offset, -1.9, -0.05),
        scale: new Vector3(0.05, 0.05, 0.05),
      })
    )
    dot.setParent(boardBase)
    dots.push(dot)

    let dotBackSide = new Entity()
    dotBackSide.addComponent(new PlaneShape())
    dotBackSide.addComponent(inactiveEventMaterial)
    dotBackSide.addComponent(
      new Transform({
        position: new Vector3(-offset, -1.9, 0.05),
        scale: new Vector3(0.05, 0.05, 0.05),
      })
    )
    dotBackSide.setParent(boardBase)
    dotsBackSide.push(dotBackSide)
  }
}

export function displayEvent(events: any[], currentEvent: number) {
  let event = events[currentEvent]
  imageMaterial.albedoTexture = new Texture(event.image)
  image.addComponentOrReplace(imageMaterial)
  imageBackSide.addComponentOrReplace(imageMaterial)
  let eventCoords = event.x.toString() + ',' + event.y.toString()
  if (event.scene_name) {
    eventCoords = shortenText(event.scene_name, 25) + '  ' + eventCoords
  }

  title.getComponent(TextShape).value = splitTextIntoLines(event.name, 25, 2)
  titleBackSide.getComponent(TextShape).value = splitTextIntoLines(
    event.name,
    25,
    2
  )
  coords.getComponent(TextShape).value = eventCoords
  coordsBackSide.getComponent(TextShape).value = eventCoords
  clickPanel.addComponentOrReplace(
    new OnPointerDown(
      (e) => {
        teleportTo(eventCoords)
      },
      { hoverText: 'Teleport to event' }
    )
  )
  clickPanelBackSide.addComponentOrReplace(
    new OnPointerDown(
      (e) => {
        teleportTo(eventCoords)
      },
      { hoverText: 'Teleport to event' }
    )
  )

  if (dots.length <= 0) {
    createDots(events.length)
  }

  for (let i = 0; i < dots.length; i++) {
    if (i === currentEvent) {
      dots[i].addComponentOrReplace(activeEventMaterial)
      dotsBackSide[i].addComponentOrReplace(activeEventMaterial)
    } else {
      dots[i].addComponentOrReplace(inactiveEventMaterial)
      dotsBackSide[i].addComponentOrReplace(inactiveEventMaterial)
    }
  }
}
