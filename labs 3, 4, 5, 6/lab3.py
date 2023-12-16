import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Line3DCollection
import numpy as np
from matplotlib.widgets import Slider

fig = plt.figure(figsize=(7,7))
ax = fig.add_subplot(111, projection='3d')

approximate = 10

ax1 = fig.add_axes([0.25, 0.05, 0.65, 0.03])
slider = Slider(
    ax=ax1,
    label='Аппроксимация   ',
    valmin=1,
    valmax=100,
    valinit=approximate,
    valstep=1
)

ax2 = fig.add_axes([0.25, 0.15, 0.65, 0.03])
slider2 = Slider(
    ax=ax2,
    label='Угол   ',
    valmin=0,
    valmax=180,
    valinit=0,
    valstep=0.1
)

ax3 = fig.add_axes([0.25, 0.25, 0.65, 0.03])
slider3 = Slider(
    ax=ax3,
    label='Радиус   ',
    valmin=0,
    valmax=50,
    valinit=0,
    valstep=1
)

c = 100
a = c / 3

def drawEllipsoid(val):
    u = np.linspace(0, 2 * np.pi, slider.val)
    v = np.linspace(0, np.pi, slider.val)
    x = (a + slider3.val) * np.outer(np.cos(u), np.sin(v))
    y = (a + slider3.val) * np.outer(np.sin(u), np.sin(v))
    z = c * np.outer(np.ones_like(u), np.cos(v))
    
    angle = np.deg2rad(slider2.val)
    t = np.transpose(np.array([x, y, z]), (1, 2, 0))
    m = [[np.cos(angle), 0, np.sin(angle)], [0, 1, 0], [-np.sin(angle), 0, np.cos(angle)]]
    x,y,z = np.transpose(np.dot(t, m), (2, 0, 1))
    
    ax.plot_surface(x, y, z, rcount=slider.val, ccount=slider.val, alpha=1)
    ax.set_xlim([-c, c])
    ax.set_ylim([-c, c])
    ax.set_zlim([-c, c])

drawEllipsoid(approximate)

def update(val):
    ax.clear()
    drawEllipsoid(val)

slider.on_changed(update)
slider2.on_changed(update)
slider3.on_changed(update)

plt.show()