import pygame
import numpy as np
from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GLU import *

lightpos = (2.0, 1.0, -3.0)

def drawPrisma(faces, verts):
    material = (0.9, 0.6, 0.3, 1.0)
    material2 = (0.0, 0.0, 0.0, 1.0)
    glColor3fv([0.5, 0.5, 0.5])
    glMaterialfv(GL_FRONT_AND_BACK, GL_DIFFUSE, material)
    glMaterialfv(GL_FRONT_AND_BACK, GL_SPECULAR, material2)
    glLightfv(GL_LIGHT0, GL_POSITION, lightpos) 
    glBegin(GL_QUADS)

    for surface in faces:
        for vertex in surface:
            glVertex3fv(verts[vertex])
    glEnd()

def main():
    pygame.init()
    display = (800, 800)
    pygame.display.set_mode(display, DOUBLEBUF|OPENGL)
    gluPerspective(45, (display[0]/display[1]), 0.1, 50.0)
    glTranslatef(0, 0, -5)

    glClearColor(0.5, 0.5, 0.5, 1.0)
    gluOrtho2D(-1.0, 1.0, -1.0, 1.0)

    glEnable(GL_LIGHTING)
    glEnable(GL_LIGHT0)
    glLightfv(GL_LIGHT0, GL_POSITION, lightpos)

    ambient = (1.0, 1.0, 1.0, 1)  
    glLightModelfv(GL_LIGHT_MODEL_AMBIENT, ambient)

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
            glRotatef(mouseMove[0]*0.3, 0.0, 0.0, -1.0)
            glRotatef(mouseMove[1]*0.3, 1.0, 0.0, 0.0)
        glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT)

        phi = np.linspace(0, 2 * np.pi, n)
        ksi = np.linspace(-np.pi, np.pi, n)

        verts = []
            
        for i in range(0, n):
            for j in range(0, n):
                W = np.array([2*v * np.cos(phi[j]) * np.cos(ksi[i]),
                                v * np.sin(phi[j]) * np.cos(ksi[i]),
                                v * np.sin(ksi[i])])
                verts.append(W)
        verts = np.array(verts)

        faces = []
        for i in range(0, n * n - n - 1):
            faces.append([i, i + n, i + n + 1, i + 1])

        drawPrisma(faces, verts)
        
        pygame.display.flip()
        pygame.time.wait(10)

main()