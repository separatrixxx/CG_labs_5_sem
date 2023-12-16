import pygame
from pygame.locals import *
from OpenGL.GL import * 
from OpenGL.GLU import *
import numpy as np

lightpos = (2.0, 1.0, -3.0)

def drawEllipsoid(faces, verts):
    material = (0.9, 0.6, 0.3, 1.0)
    material2 = (0.0, 0.0, 0.0, 1.0)
    glColor3fv([0.5, 0.5, 0.5])
    glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, material)
    glMaterialfv(GL_FRONT_AND_BACK, GL_SPECULAR, material2)
    glLightfv(GL_LIGHT0, GL_POSITION, lightpos) 

    t = pygame.time.get_ticks() / 1000
    glBegin(GL_QUADS)
    for surface in faces:
        for vertex in surface:
            glColor3fv([0.5, 0.5, 0.5])
            x = verts[vertex][0] * np.cos(t)
            y = verts[vertex][1] * np.sin(verts[vertex][0] + t)
            z = verts[vertex][2]
            glVertex3fv([x, y, z])
    glEnd()

def main():
    pygame.init()
    display = (800, 800)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
    gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)
    glTranslatef(0, 0, -5)

    glClearColor(0.5, 0.5, 0.5, 1.0)
    gluOrtho2D(-1.0, 1.0, -1.0, 1.0)

    glEnable(GL_LIGHTING)
    glEnable(GL_LIGHT0)
    glLightfv(GL_LIGHT0, GL_POSITION, lightpos)

    n = 5
    v = 0.7

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()

        keypress = pygame.key.get_pressed()
        mousepress = pygame.mouse.get_pressed()

        if keypress[pygame.K_w]:
            glTranslatef(0, 0, 0.1)
        if keypress[pygame.K_s]:
            glTranslatef(0, 0, -0.1)
        if keypress[pygame.K_a]:
            glTranslatef(-0.1, 0, 0)
        if keypress[pygame.K_d]:
            glTranslatef(0.1, 0, 0)
        if keypress[pygame.K_z]:
            n += 1
        if keypress[pygame.K_x]:
            if n > 5:
                n -= 1
        if mousepress[0]:
            mouseMove = pygame.mouse.get_rel()
            glRotatef(mouseMove[0] * 0.3, 0.0, 0.0, -1.0)
            glRotatef(mouseMove[1] * 0.3, 1.0, 0.0, 0.0)

        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

        phi = np.linspace(0, 2 * np.pi, n)
        ksi = np.linspace(-np.pi, np.pi, n)

        verts = []

        for i in range(0, n):
            for j in range(0, n):
                W = np.array([v * np.cos(phi[j]) * np.cos(ksi[i]),
                            v * np.sin(phi[j]) * np.cos(ksi[i]),
                            v * np.sin(ksi[i])])
                verts.append(W)
        verts = np.array(verts)

        faces = []

        for i in range(0, n * n - n - 1):
            faces.append([i, i + n, i + n + 1, i + 1])

        drawEllipsoid(faces, verts)

        pygame.display.flip()
        pygame.time.wait(10)

if __name__ == "__main__":
    main()
